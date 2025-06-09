<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* __string_template__86c1358fbad561b8f1c2e864705445b0 */
class __TwigTemplate_3eeb81ca48d64ce5757331a182eba654 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        yield "<div class=\"card card-primary h-100\">
    <!-- Default panel contents -->
    <div class=\"card-header\">
        <h5 class=\"card-title\">";
        // line 4
        yield gT("Share survey");
        yield "</h5>
    </div>
    <!-- List group -->
    <ul class=\"list-group list-group-flush\">
        <!-- Base language -->
        <li class=\"list-group-item p-0 border-0\" id=\"adminsidepanel__surveysummary--mainLanguageLink\">
            <div class=\"ls-flex-row col-12\">
                <div class=\"col-4 card-label\">
                    ";
        // line 12
        yield getLanguageNameFromCode($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 12), 12, $this->source), false);
        yield " (";
        yield gT("Base language");
        yield "):
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                    ";
        // line 15
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 15)) {
            yield " ";
            // line 16
            yield "                        ";
            $context["tmp_url"] = (($__internal_compile_0 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess && in_array(get_class($__internal_compile_0), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_0[CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 16)] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 16), [], "array", false, false, true, 16));
            // line 17
            yield "                    ";
        }
        // line 18
        yield "                    <a href='";
        yield $this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 18, $this->source);
        yield "' target='_blank'> ";
        yield $this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 18, $this->source);
        yield " </a>
                </div>
            </div>
        </li>
        <!-- Additional languages  -->
        ";
        // line 23
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["aAdditionalLanguages"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["langname"]) {
            // line 24
            yield "        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
            // line 27
            yield (getLanguageNameFromCode($this->sandbox->ensureToStringAllowed($context["langname"], 27, $this->source), false) . ":");
            yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                    ";
            // line 30
            if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 30)) {
                yield " ";
                // line 31
                yield "                        ";
                $context["tmp_url"] = (($__internal_compile_1 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_1) || $__internal_compile_1 instanceof ArrayAccess && in_array(get_class($__internal_compile_1), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_1[$context["langname"]] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), $context["langname"], [], "array", false, false, true, 31));
                // line 32
                yield "                    ";
            }
            // line 33
            yield "                    <a href='";
            yield $this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 33, $this->source);
            yield "' target='_blank'> ";
            yield $this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 33, $this->source);
            yield " </a>
                </div>
            </div>
        </li>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['langname'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 38
        yield "
        <!-- End URL -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 43
        yield gT("End URL:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                        ";
        // line 46
        yield $this->sandbox->ensureToStringAllowed(($context["endurl"] ?? null), 46, $this->source);
        yield "
                </div>
            </div>
        </li>
        <!-- Number of questions/groups -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 54
        yield gT("Number of questions/groups:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                    ";
        // line 57
        yield (($this->sandbox->ensureToStringAllowed(($context["sumcount3"] ?? null), 57, $this->source) . "/") . $this->sandbox->ensureToStringAllowed(($context["sumcount2"] ?? null), 57, $this->source));
        yield "
                </div>
            </div>
        </li>
        <!-- Sharing panel -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
                <div class=\"col-4 card-label\">
                    ";
        // line 65
        yield gT("Sharing panel:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                   <div class='selector_openSharePanel'  data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"";
        // line 68
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "active", [], "any", false, false, true, 68) == "Y")) ? ("") : (gT("Activate your survey to open this panel")));
        yield "\">
                        <a href=\"#sharingdialog\" class=\"btn btn-outline-secondary ";
        // line 69
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "active", [], "any", false, false, true, 69) == "Y")) ? ("") : ("disabled"));
        yield "\" data-bs-toggle=\"modal\"
                        id=\"sharePanelButton_";
        // line 70
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 70), 70, $this->source);
        yield "\" data-surveyid=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 70), 70, $this->source);
        yield "\">
                            ";
        // line 71
        yield gT("Open sharing panel");
        yield "
                        </a>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>

";
        // line 80
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "active", [], "any", false, false, true, 80) == "Y")) {
            // line 81
            yield "    <div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" id=\"sharingdialog\">
        <div class=\"modal-dialog\" role=\"document\">
            <div class=\"modal-content\">
                <div class=\"modal-header\">
                    <h5 class=\"modal-title\">";
            // line 85
            yield gT("Share survey");
            yield "</h5>
                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
                </div>
                <div class=\"modal-body\">
                    <div class=\"card card-primary h-100 mb-3 p-4\">
                        <div class=\"card-header\">
                            <h5 class=\"card-title\">";
            // line 91
            yield gT("Share QR-code:");
            yield "</h5>
                        </div>
                        <div class=\"card-body border rounded\">
                            <ul class=\"list-group list-group-flush\">
                                ";
            // line 95
            if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 95)) {
                yield " ";
                // line 96
                yield "                                        ";
                $context["tmp_url"] = (($__internal_compile_2 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_2) || $__internal_compile_2 instanceof ArrayAccess && in_array(get_class($__internal_compile_2), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_2[CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 96)] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 96), [], "array", false, false, true, 96));
                // line 97
                yield "                                ";
            }
            // line 98
            yield "                                 <li class=\"list-group-item p-0 border-0 mb-2\">
                                    <div class=\"ls-flex-row col-12 align-items-center\">
                                        <div class=\"col-4\">
                                            ";
            // line 101
            yield getLanguageNameFromCode($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 101), 101, $this->source), false);
            yield "
                                        </div>
                                        <div class=\"col-8 d-flex justify-content-center\">
                                            <div class=\"selector__qrcode_container\">
                                                <button class=\"btn btn-outline-secondary selector__qrcode_trigger\">";
            // line 105
            yield gT("Generate QR-Code");
            yield "</button>
                                                <div class=\"selector__qrcode\" data-url=\"";
            // line 106
            yield $this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 106, $this->source);
            yield "\"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ";
            // line 111
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(($context["aAdditionalLanguages"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["langname"]) {
                // line 112
                yield "                                    ";
                if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 112)) {
                    yield " ";
                    // line 113
                    yield "                                        ";
                    $context["tmp_url"] = (($__internal_compile_3 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_3) || $__internal_compile_3 instanceof ArrayAccess && in_array(get_class($__internal_compile_3), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_3[$context["langname"]] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), $context["langname"], [], "array", false, false, true, 113));
                    // line 114
                    yield "                                    ";
                }
                // line 115
                yield "                                    <li class=\"list-group-item p-0 border-0";
                if ( !CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "last", [], "any", false, false, true, 115)) {
                    yield " mb-2";
                }
                yield "\">
                                        <div class=\"ls-flex-row col-12 align-items-center\">
                                            <div class=\"col-4\">
                                                ";
                // line 118
                yield getLanguageNameFromCode($this->sandbox->ensureToStringAllowed($context["langname"], 118, $this->source), false);
                yield "
                                            </div>
                                            <div class=\"col-8 d-flex justify-content-center\">
                                                <div class=\"selector__qrcode_container\">
                                                    <button class=\"btn btn-outline-secondary selector__qrcode_trigger\">";
                // line 122
                yield gT("Generate QR-Code");
                yield "</button>
                                                    <div class=\"selector__qrcode\" data-url=\"";
                // line 123
                yield $this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 123, $this->source);
                yield "\"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['langname'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 129
            yield "                            </ul>
                        </div>
                    </div>
                    <div class=\"card card-primary h-100 mb-3 p-4\">
                        <div class=\"card-header\">
                            <h5 class=\"card-title\">
                                ";
            // line 135
            yield gT("Share on Facebook:");
            yield "
                            </h5>
                            <button class=\"btn btn-xs btn-warning float-end facebook-button\" 
                                  id=\"selector_activateFacebookSharing\">";
            // line 138
            yield gT("Enable");
            yield "</button>
                        </div>
                        <div class=\"card-body border rounded\">
                            <ul class=\"list-group list-group-flush\">
                                ";
            // line 142
            if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 142)) {
                yield " ";
                // line 143
                yield "                                        ";
                $context["tmp_url"] = (($__internal_compile_4 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_4) || $__internal_compile_4 instanceof ArrayAccess && in_array(get_class($__internal_compile_4), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_4[CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 143)] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 143), [], "array", false, false, true, 143));
                // line 144
                yield "                                ";
            }
            // line 145
            yield "                                    <li class=\"list-group-item p-0 border-0 mb-2\">
                                    <div class=\"ls-flex-row col-12 align-items-center\">
                                        <div class=\"col-4\">
                                            ";
            // line 148
            yield getLanguageNameFromCode($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 148), 148, $this->source), false);
            yield "
                                        </div>
                                        <div class=\"col-8 d-flex justify-content-center\">
                                            <button class=\"btn btn-disabled facebook-button selector_fb_share_disabled\" disabled ><i class=\"ri-facebook-box-fill\"></i> ";
            // line 151
            yield gT("Disabled");
            yield "</button>
                                            <iframe class=\"selector_fb_share d-none\" data-src=\"https://www.facebook.com/plugins/share_button.php?href=";
            // line 152
            yield Twig\Extension\CoreExtension::urlencode($this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 152, $this->source));
            yield "&layout=button_count&size=large&mobile_iframe=true&appId=328433594315978&width=106&height=28\" width=\"106\" height=\"28\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>
                                        </div>
                                    </div>
                                </li>
                                ";
            // line 156
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(($context["aAdditionalLanguages"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["langname"]) {
                // line 157
                yield "                                    ";
                if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 157)) {
                    yield " ";
                    // line 158
                    yield "                                        ";
                    $context["tmp_url"] = (($__internal_compile_5 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_5) || $__internal_compile_5 instanceof ArrayAccess && in_array(get_class($__internal_compile_5), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_5[$context["langname"]] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), $context["langname"], [], "array", false, false, true, 158));
                    // line 159
                    yield "                                    ";
                }
                // line 160
                yield "                                    <li class=\"list-group-item p-0 border-0";
                if ( !CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "last", [], "any", false, false, true, 160)) {
                    yield " mb-2";
                }
                yield "\">
                                        <div class=\"ls-flex-row col-12 align-items-center\">
                                            <div class=\"col-4\">
                                                ";
                // line 163
                yield getLanguageNameFromCode($this->sandbox->ensureToStringAllowed($context["langname"], 163, $this->source), false);
                yield "
                                            </div>
                                            <div class=\"col-8 d-flex justify-content-center\">
                                                <button class=\"btn btn-disabled facebook-button selector_fb_share_disabled\" disabled ><i class=\"ri-facebook-box-fill\"></i> ";
                // line 166
                yield gT("Disabled");
                yield "</button>
                                                <iframe class=\"selector_fb_share d-none h-12\" data-src=\"https://www.facebook.com/plugins/share_button.php?href=";
                // line 167
                yield Twig\Extension\CoreExtension::urlencode($this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 167, $this->source));
                yield "&layout=button_count&size=large&mobile_iframe=true&appId=1321262851319939&width=106&height=28\" width=\"106\" height=\"28\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>
                                            </div>
                                        </div>
                                    </li>
                                ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['langname'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 172
            yield "                            </ul>
                        </div>
                    </div>
                    <div class=\"card card-primary h-100 mb-3 p-4\">
                        <div class=\"card-header\">
                            <h5 class=\"card-title\">
                                ";
            // line 178
            yield gT("Share on Twitter:");
            yield "
                            </h5>
                        </div>
                        <div class=\"card-body border rounded\">
                            <ul class=\"list-group list-group-flush\">
                                ";
            // line 183
            if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 183)) {
                yield " ";
                // line 184
                yield "                                    ";
                $context["tmp_url"] = (($__internal_compile_6 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_6) || $__internal_compile_6 instanceof ArrayAccess && in_array(get_class($__internal_compile_6), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_6[CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 184)] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 184), [], "array", false, false, true, 184));
                // line 185
                yield "                                ";
            }
            // line 186
            yield "                                <li class=\"list-group-item p-0 border-0 mb-2\">
                                    <div class=\"ls-flex-row col-12 align-items-center\">
                                        <div class=\"col-4\">
                                            ";
            // line 189
            yield getLanguageNameFromCode($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "language", [], "any", false, false, true, 189), 189, $this->source), false);
            yield "
                                        </div>
                                        <div class=\"col-8 d-flex justify-content-center\">
                                            <a class=\"btn btn-outline-secondary twitter-button\" target='_blank' href=\"https://twitter.com/intent/tweet?text=";
            // line 192
            yield Twig\Extension\CoreExtension::urlencode(gT("Thanks for taking this survey!"));
            yield "&url=";
            yield Twig\Extension\CoreExtension::urlencode($this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 192, $this->source));
            yield "&hashtags=limesurvey,survey\">
                                                <i class=\"ri-twitter-fill\"></i>";
            // line 193
            yield gT("Tweet it");
            yield "
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                ";
            // line 198
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(($context["aAdditionalLanguages"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["langname"]) {
                // line 199
                yield "                                    ";
                if (CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 199)) {
                    yield " ";
                    // line 200
                    yield "                                        ";
                    $context["tmp_url"] = (($__internal_compile_7 = ($context["surveyUrls"] ?? null)) && is_array($__internal_compile_7) || $__internal_compile_7 instanceof ArrayAccess && in_array(get_class($__internal_compile_7), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_7[$context["langname"]] ?? null) : CoreExtension::getAttribute($this->env, $this->source, ($context["surveyUrls"] ?? null), $context["langname"], [], "array", false, false, true, 200));
                    // line 201
                    yield "                                    ";
                }
                // line 202
                yield "                                    <li class=\"list-group-item p-0 border-0";
                if ( !CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "last", [], "any", false, false, true, 202)) {
                    yield " mb-2";
                }
                yield "\">
                                        <div class=\"ls-flex-row col-12 align-items-center\">
                                            <div class=\"col-4\">
                                                ";
                // line 205
                yield getLanguageNameFromCode($this->sandbox->ensureToStringAllowed($context["langname"], 205, $this->source), false);
                yield "
                                            </div>
                                            <div class=\"col-8 d-flex justify-content-center\">
                                                <a class=\"btn btn-outline-secondary twitter-button\" target='_blank' href=\"https://twitter.com/intent/tweet?text=";
                // line 208
                yield Twig\Extension\CoreExtension::urlencode(gT("Thanks for taking this survey!"));
                yield "&url=";
                yield Twig\Extension\CoreExtension::urlencode($this->sandbox->ensureToStringAllowed(($context["tmp_url"] ?? null), 208, $this->source));
                yield "&hashtags=limesurvey,survey\">
                                                    <i class=\"ri-twitter-fill\"></i>";
                // line 209
                yield gT("Tweet it");
                yield "
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['langname'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 215
            yield "                            </ul>
                        </div>
                    </div>
                </div>
                <div class=\"modal-footer\">
                    <button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\">";
            // line 220
            yield gT("Close");
            yield "</button>
                </div>
            </div>
        </div>
    </div>

";
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__86c1358fbad561b8f1c2e864705445b0";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  561 => 220,  554 => 215,  534 => 209,  528 => 208,  522 => 205,  513 => 202,  510 => 201,  507 => 200,  503 => 199,  486 => 198,  478 => 193,  472 => 192,  466 => 189,  461 => 186,  458 => 185,  455 => 184,  452 => 183,  444 => 178,  436 => 172,  417 => 167,  413 => 166,  407 => 163,  398 => 160,  395 => 159,  392 => 158,  388 => 157,  371 => 156,  364 => 152,  360 => 151,  354 => 148,  349 => 145,  346 => 144,  343 => 143,  340 => 142,  333 => 138,  327 => 135,  319 => 129,  299 => 123,  295 => 122,  288 => 118,  279 => 115,  276 => 114,  273 => 113,  269 => 112,  252 => 111,  244 => 106,  240 => 105,  233 => 101,  228 => 98,  225 => 97,  222 => 96,  219 => 95,  212 => 91,  203 => 85,  197 => 81,  195 => 80,  183 => 71,  177 => 70,  173 => 69,  169 => 68,  163 => 65,  152 => 57,  146 => 54,  135 => 46,  129 => 43,  122 => 38,  108 => 33,  105 => 32,  102 => 31,  99 => 30,  93 => 27,  88 => 24,  84 => 23,  73 => 18,  70 => 17,  67 => 16,  64 => 15,  56 => 12,  45 => 4,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__86c1358fbad561b8f1c2e864705445b0", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 15, "set" => 16, "for" => 23);
        static $filters = array("url_encode" => 152);
        static $functions = array("gT" => 4, "getLanguageNameFromCode" => 12);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set', 'for'],
                ['url_encode'],
                ['gT', 'getLanguageNameFromCode'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}

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

/* ./subviews/registration/register_form.twig */
class __TwigTemplate_e01b1ca24b99d0fe367f592c571ae3bf extends Template
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
        yield "
";
        // line 18
        yield "
<div class=\"";
        // line 19
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 19), "registerform", [], "any", false, false, true, 19), 19, $this->source);
        yield " row\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 19), "registerform", [], "any", false, false, true, 19), 19, $this->source);
        yield ">
    ";
        // line 20
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 20), "form", [CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "sRegisterFormUrl", [], "any", false, false, true, 20), "post", ["id" => "limesurvey", "role" => "form", "class" => "form"]], "method", false, false, true, 20), 20, $this->source);
        yield "

    ";
        // line 22
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "registerform", [], "any", false, false, true, 22), "hiddeninputs", [], "any", false, false, true, 22), 22, $this->source);
        yield "

    <div class='";
        // line 24
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 24), "registerformcol", [], "any", false, false, true, 24), 24, $this->source);
        yield " col-12' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 24), "registerformcol", [], "any", false, false, true, 24), 24, $this->source);
        yield ">
        <div class=\"ls-js-hidden \">
            ";
        // line 26
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/language_changer.twig");
        yield "
        </div>
        <div class=\"row mb-3\">
            ";
        // line 30
        yield "            <div class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 30), "registerformcolrow", [], "any", false, false, true, 30), 30, $this->source);
        yield " col-md-6 col-12 mb-3 mb-md-0' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 30), "registerformcolrow", [], "any", false, false, true, 30), 30, $this->source);
        yield ">
                <label for='register_firstname' class='";
        // line 31
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 31), "registerformcolrowlabel", [], "any", false, false, true, 31), 31, $this->source);
        yield " control-label '>";
        yield gT("First name");
        yield "</label>
                <div class=\"\">
                    ";
        // line 33
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 33), "textField", ["register_firstname", CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "sFirstName", [], "any", false, false, true, 33), ["id" => "register_firstname", "class" => "form-control ls-important-field", "placeholder" => gT("Enter your first name")]], "method", false, false, true, 33), 33, $this->source);
        yield "
                </div>
            </div>

            ";
        // line 38
        yield "            <div class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 38), "registerformcolrowb", [], "any", false, false, true, 38), 38, $this->source);
        yield " col-md-6 col-12' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 38), "registerformcolrowb", [], "any", false, false, true, 38), 38, $this->source);
        yield ">
                <label ";
        // line 39
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 39), "registerformcolrowblabel", [], "any", false, false, true, 39), 39, $this->source);
        yield "  class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 39), "registerformcolrowblabel", [], "any", false, false, true, 39), 39, $this->source);
        yield " control-label '>";
        yield gT("Last name");
        yield "</label>
                <div ";
        // line 40
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 40), "registerformcolrowbdiv", [], "any", false, false, true, 40), 40, $this->source);
        yield " >
                    ";
        // line 41
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 41), "textField", ["register_lastname", CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "sLastName", [], "any", false, false, true, 41), ["id" => "register_lastname", "class" => "form-control ls-important-field", "placeholder" => gT("Enter your last name")]], "method", false, false, true, 41), 41, $this->source);
        yield "
                </div>
            </div>
        </div>
        ";
        // line 46
        yield "        <div class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 46), "registerformcolrowc", [], "any", false, false, true, 46), 46, $this->source);
        yield " row' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 46), "registerformcolrowc", [], "any", false, false, true, 46), 46, $this->source);
        yield ">
            <label ";
        // line 47
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 47), "registerformcolrowclabel", [], "any", false, false, true, 47), 47, $this->source);
        yield " class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 47), "registerformcolrowclabel", [], "any", false, false, true, 47), 47, $this->source);
        yield "  control-label'> ";
        yield gT("E-mail");
        yield " ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/registration/required.twig");
        yield "</label>
            <div ";
        // line 48
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 48), "registerformcolrowcdiv", [], "any", false, false, true, 48), 48, $this->source);
        yield "  >
                ";
        // line 49
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 49), "emailField", ["register_email", CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "sEmail", [], "any", false, false, true, 49), ["id" => "register_email", "class" => "form-control ls-important-field", "required" => true, "placeholder" => gT("Enter e-mail address")]], "method", false, false, true, 49), 49, $this->source);
        yield "
            </div>
        </div>

        ";
        // line 54
        yield "        ";
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aExtraAttributes", [], "any", false, false, true, 54));
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
        foreach ($context['_seq'] as $context["key"] => $context["aExtraAttribute"]) {
            // line 55
            yield "            <div class=' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 55), "registerformextras", [], "any", false, false, true, 55), 55, $this->source);
            yield " row' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 55), "registerformextras", [], "any", false, false, true, 55), 55, $this->source);
            yield " >
                ";
            // line 56
            $context["registerKey"] = ("register_" . $this->sandbox->ensureToStringAllowed($context["key"], 56, $this->source));
            // line 57
            yield "                <label for=\"";
            yield $this->sandbox->ensureToStringAllowed(($context["registerKey"] ?? null), 57, $this->source);
            yield "\" class='";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 57), "registerformextraslabel", [], "any", false, false, true, 57), 57, $this->source);
            yield " control-label '> ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["aExtraAttribute"], "caption", [], "any", false, false, true, 57), 57, $this->source);
            yield " ";
            if ((CoreExtension::getAttribute($this->env, $this->source, $context["aExtraAttribute"], "mandatory", [], "any", false, false, true, 57) == "Y")) {
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/registration/required.twig");
            }
            yield "</label>
                <div ";
            // line 58
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 58), "registerformcolrowcdiv", [], "any", false, false, true, 58), 58, $this->source);
            yield " >
                    ";
            // line 59
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 59), "textField", [($context["registerKey"] ?? null), (($__internal_compile_0 = CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aAttribute", [], "any", false, false, true, 59)) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess && in_array(get_class($__internal_compile_0), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_0[$context["key"]] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aAttribute", [], "any", false, false, true, 59), $context["key"], [], "array", false, false, true, 59)), ["id" => ($context["registerKey"] ?? null), "class" => "form-control ls-important-field"]], "method", false, false, true, 59), 59, $this->source);
            yield "
                </div>
            </div>
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
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['aExtraAttribute'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 63
        yield "
        ";
        // line 65
        yield "        ";
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "bCaptcha", [], "any", false, false, true, 65)) {
            // line 66
            yield "            <div class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 66), "registerformcaptcha", [], "any", false, false, true, 66), 66, $this->source);
            yield " \" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 66), "maincolformdivb", [], "any", false, false, true, 66), 66, $this->source);
            yield ">
                <label class='";
            // line 67
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 67), "registerformcaptchalabel", [], "any", false, false, true, 67), 67, $this->source);
            yield " control-label ' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 67), "registerformcaptchalabel", [], "any", false, false, true, 67), 67, $this->source);
            yield " >";
            yield gT("Please solve the following equation:");
            yield " ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/registration/required.twig");
            yield "</label>
                <div class=\"row\" ";
            // line 68
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 68), "registerformcaptchadiv", [], "any", false, false, true, 68), 68, $this->source);
            yield ">
                    <div class=\"";
            // line 69
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 69), "registerformcaptchadivb", [], "any", false, false, true, 69), 69, $this->source);
            yield " captcha-container col-xl-2 col-lg-3 col-md-12 align-items-center\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 69), "registerformcaptchadivb", [], "any", false, false, true, 69), 69, $this->source);
            yield ">
                            ";
            // line 70
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, LS_Twig_Extension::renderCaptcha(), "renderOut", [], "method", false, false, true, 70), 70, $this->source);
            yield "
                        <a href=\"#\" class=\"btn btn-outline-secondary\" id=\"reloadCaptcha\" title=\"";
            // line 71
            yield gT("Reload captcha");
            yield "\" data-toggle=\"captcha\"><i class=\"ri-refresh-line\"></i></a>
                    </div>
                    <div class=\"col-xl-10 col-lg-9 col-md-12 captcha-input align-self-center\">
                        <input class='form-control ls-important-field ";
            // line 74
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 74), "registerformcaptchainput", [], "any", false, false, true, 74), 74, $this->source);
            yield "' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 74), "registerformcaptchainput", [], "any", false, false, true, 74), 74, $this->source);
            yield " placeholder=\"";
            yield gT("Enter result here - numbers only");
            yield "\">
                    </div>
                </div>
            </div>
        ";
        }
        // line 79
        yield "
        ";
        // line 81
        yield "        <div class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 81), "registermandatoryinfo", [], "any", false, false, true, 81), 81, $this->source);
        yield " small mt-2' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 81), "registermandatoryinfo", [], "any", false, false, true, 81), 81, $this->source);
        yield " >
                ";
        // line 82
        yield gT("Fields marked with an asterisk are mandatory.");
        yield "
        </div>

        ";
        // line 86
        yield "        <div class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 86), "registersave", [], "any", false, false, true, 86), 86, $this->source);
        yield " ' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 86), "registersave", [], "any", false, false, true, 86), 86, $this->source);
        yield " >
            <div class='";
        // line 87
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 87), "registersavediv", [], "any", false, false, true, 87), 87, $this->source);
        yield " ' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 87), "registersavediv", [], "any", false, false, true, 87), 87, $this->source);
        yield " >
                ";
        // line 88
        $context["continue"] = gT("Register now", "unescaped");
        // line 89
        yield "                <button ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 89), "registersavedivbutton", [], "any", false, false, true, 89), 89, $this->source);
        yield "  class='";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 89), "registersavedivbutton", [], "any", false, false, true, 89), 89, $this->source);
        yield " btn btn-primary' >
                    ";
        // line 90
        yield $this->sandbox->ensureToStringAllowed(($context["continue"] ?? null), 90, $this->source);
        yield "
                </button>
            </div>
        </div>

        ";
        // line 96
        yield "    </div>
    <div class='";
        // line 97
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 97), "registerformcoladdidtions", [], "any", false, false, true, 97), 97, $this->source);
        yield " col-lg-8 offset-lg-2' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 97), "registerformcoladdidtions", [], "any", false, false, true, 97), 97, $this->source);
        yield ">
        ";
        // line 98
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "formAdditions", [], "any", false, false, true, 98), 98, $this->source);
        yield "
    </div>

    ";
        // line 101
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 101), "endForm", [], "any", false, false, true, 101), 101, $this->source);
        yield "
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/registration/register_form.twig";
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
        return array (  328 => 101,  322 => 98,  316 => 97,  313 => 96,  305 => 90,  298 => 89,  296 => 88,  290 => 87,  283 => 86,  277 => 82,  270 => 81,  267 => 79,  255 => 74,  249 => 71,  245 => 70,  239 => 69,  235 => 68,  225 => 67,  218 => 66,  215 => 65,  212 => 63,  194 => 59,  190 => 58,  177 => 57,  175 => 56,  168 => 55,  150 => 54,  143 => 49,  139 => 48,  129 => 47,  122 => 46,  115 => 41,  111 => 40,  103 => 39,  96 => 38,  89 => 33,  82 => 31,  75 => 30,  69 => 26,  62 => 24,  57 => 22,  52 => 20,  46 => 19,  43 => 18,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/registration/register_form.twig", "/Users/emmamendez/Source/KLPS/Website-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/registration/register_form.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("for" => 54, "set" => 56, "if" => 57);
        static $filters = array("raw" => 98);
        static $functions = array("include" => 26, "gT" => 31, "renderCaptcha" => 70);

        try {
            $this->sandbox->checkSecurity(
                ['for', 'set', 'if'],
                ['raw'],
                ['include', 'gT', 'renderCaptcha'],
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

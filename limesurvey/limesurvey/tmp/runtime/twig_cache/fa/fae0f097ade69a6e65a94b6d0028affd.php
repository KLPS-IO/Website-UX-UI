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

/* ./subviews/messages/bootstrap_alert_modal.twig */
class __TwigTemplate_1b46f4bc41541f946bf2f3eb65e3b62a extends Template
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
        // line 21
        yield "


";
        // line 25
        if ((empty(LS_Twig_Extension::json_decode(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "jPopup", [], "any", false, false, true, 25))) == false)) {
            // line 26
            yield "    ";
            yield LS_Twig_Extension::registerScript("startPopup", ("LSvar.startPopups = " . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "jPopup", [], "any", false, false, true, 26), 26, $this->source)), "POS_HEAD");
            yield "
    ";
            // line 27
            yield LS_Twig_Extension::registerScript("showStartPopups", (("window.templateCore.alertSurveyDialog(" . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "jPopup", [], "any", false, false, true, 27), 27, $this->source)) . ");"), "POS_END");
            yield "
    ";
            // line 28
            yield LS_Twig_Extension::registerScript("activateSoftMandatory", "activateSoftMandatory();", "POS_END");
            yield "
";
        }
        // line 30
        yield "
<!-- Bootstrap Modal Alert -->
";
        // line 32
        if (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "id", [], "any", false, false, true, 32), "alertmodal", [], "any", false, false, true, 32)) {
            // line 33
            yield "<div id=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "id", [], "any", false, false, true, 33), "alertmodal", [], "any", false, false, true, 33), 33, $this->source);
            yield "\" class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 33), "alertmodal", [], "any", false, false, true, 33), 33, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 33), "alertmodal", [], "any", false, false, true, 33), 33, $this->source);
            yield ">
    <div class=\"";
            // line 34
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 34), "modaldialog", [], "any", false, false, true, 34), 34, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 34), "modaldialog", [], "any", false, false, true, 34), 34, $this->source);
            yield ">
        <div class=\"";
            // line 35
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 35), "modalcontent", [], "any", false, false, true, 35), 35, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 35), "modalcontent", [], "any", false, false, true, 35), 35, $this->source);
            yield " >
            <div class=\"";
            // line 36
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 36), "modalheader", [], "any", false, false, true, 36), 36, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 36), "modalheader", [], "any", false, false, true, 36), 36, $this->source);
            yield " >
                <button  ";
            // line 37
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 37), "modalclosebutton", [], "any", false, false, true, 37), 37, $this->source);
            yield " class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 37), "modalclosebutton", [], "any", false, false, true, 37), 37, $this->source);
            yield "\"  ></button>
                <div class=\"";
            // line 38
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 38), "modaltitle", [], "any", false, false, true, 38), 38, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 38), "modaltitle", [], "any", false, false, true, 38), 38, $this->source);
            yield ">&nbsp;</div>
            </div>
            <div class=\"";
            // line 40
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 40), "modalbody", [], "any", false, false, true, 40), 40, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 40), "modalbody", [], "any", false, false, true, 40), 40, $this->source);
            yield ">
            </div>
            ";
            // line 42
            if (((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "mandNonSoft", [], "any", false, false, true, 42) == false) && CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "mandSoft", [], "any", false, false, true, 42))) {
                // line 43
                yield "            <div class=\"";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 43), "modalfooter", [], "any", false, false, true, 43), 43, $this->source);
                yield "\" ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 43), "modalfooter", [], "any", false, false, true, 43), 43, $this->source);
                yield ">
                <a id=\"";
                // line 44
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "id", [], "any", false, false, true, 44), "mandatorySoftModal", [], "any", false, false, true, 44), 44, $this->source);
                yield "\" class=\"";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 44), "modalfooterlink", [], "any", false, false, true, 44), 44, $this->source);
                yield "\" data-movenext=\"";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 44), "aMoveNext", [], "any", false, false, true, 44), "value", [], "any", false, false, true, 44), 44, $this->source);
                yield "\">";
                yield gT("Continue without answering");
                yield "</a>
                <a ";
                // line 45
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 45), "modalfooterlink", [], "any", false, false, true, 45), 45, $this->source);
                yield "  class=\"";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 45), "modalfooterlink", [], "any", false, false, true, 45), 45, $this->source);
                yield "\">";
                yield gT("Answer question");
                yield "</a>
            </div>
            ";
            } else {
                // line 48
                yield "            <div class=\"";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 48), "modalfooter", [], "any", false, false, true, 48), 48, $this->source);
                yield "\" ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 48), "modalfooter", [], "any", false, false, true, 48), 48, $this->source);
                yield ">
                <a ";
                // line 49
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 49), "modalfooterlink", [], "any", false, false, true, 49), 49, $this->source);
                yield "  class=\"";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 49), "modalfooterlink", [], "any", false, false, true, 49), 49, $this->source);
                yield "\">";
                yield gT("Close");
                yield "</a>
            </div>
            ";
            }
            // line 52
            yield "        </div>
    </div>
</div>
";
        }
        // line 56
        yield "<!-- Clear all modal -->
<div id=\"clear-all-modal\" class=\"modal\" tabindex=\"-1\">
    <div class=\"modal-dialog\">
        <div class=\"modal-content\">
            <div class=\"modal-header\">
                <h5 class=\"modal-title\" id=\"exampleModalLabel\">";
        // line 61
        yield gT("Exit and clear survey");
        yield "</h5>
                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
            </div>
            <div class=\"modal-body\">
                <p>";
        // line 65
        yield gT("Please confirm you want to clear your response?");
        yield "</p>
            </div>
            <div class=\"modal-footer\">
                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">";
        // line 68
        yield gT("Cancel");
        yield "</button>
                <button id=\"clear-all-submit\" type=\"submit\" class=\"btn btn-primary\">";
        // line 69
        yield gT("Clear");
        yield "</button>
            </div>
        </div>
    </div>
</div>";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/messages/bootstrap_alert_modal.twig";
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
        return array (  190 => 69,  186 => 68,  180 => 65,  173 => 61,  166 => 56,  160 => 52,  150 => 49,  143 => 48,  133 => 45,  123 => 44,  116 => 43,  114 => 42,  107 => 40,  100 => 38,  94 => 37,  88 => 36,  82 => 35,  76 => 34,  67 => 33,  65 => 32,  61 => 30,  56 => 28,  52 => 27,  47 => 26,  45 => 25,  40 => 21,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/messages/bootstrap_alert_modal.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/messages/bootstrap_alert_modal.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 25);
        static $filters = array();
        static $functions = array("empty" => 25, "json_decode" => 25, "registerScript" => 26, "gT" => 44);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['empty', 'json_decode', 'registerScript', 'gT'],
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
